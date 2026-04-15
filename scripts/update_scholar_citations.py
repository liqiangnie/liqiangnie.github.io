#!/usr/bin/env python3

import argparse
import json
import math
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


DEFAULT_URL = "https://scholar.google.com/citations?user=yywVMhUAAAAJ&hl=en"
DEFAULT_OUTPUT = "res/scholar-citations.json"
DEFAULT_HTML_TARGET = "Activities.html"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36"
)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Fetch and store the Google Scholar 'Citations All' value."
    )
    parser.add_argument("--url", default=DEFAULT_URL, help="Scholar profile URL.")
    parser.add_argument(
        "--output",
        default=DEFAULT_OUTPUT,
        help="Output JSON path for the rendered citation text.",
    )
    parser.add_argument(
        "--html-target",
        default=DEFAULT_HTML_TARGET,
        help="HTML file whose scholar citation placeholder should be updated.",
    )
    parser.add_argument(
        "--html-file",
        help="Read a local HTML fixture instead of fetching the remote page.",
    )
    return parser.parse_args()


def load_html(args):
    if args.html_file:
        return Path(args.html_file).read_text(encoding="utf-8")

    request = urllib.request.Request(args.url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def extract_citations_all(html):
    patterns = [
        re.compile(
            r'<td[^>]*class="gsc_rsb_sth"[^>]*>\s*Citations\s*</td>\s*'
            r'<td[^>]*class="gsc_rsb_std"[^>]*>\s*([\d,]+)\s*</td>',
            re.IGNORECASE | re.DOTALL,
        ),
        re.compile(
            r'>Citations</a?></td>\s*<td[^>]*>\s*([\d,]+)\s*</td>',
            re.IGNORECASE | re.DOTALL,
        ),
    ]

    for pattern in patterns:
        match = pattern.search(html)
        if match:
            return int(match.group(1).replace(",", ""))

    raise ValueError("Could not find the 'Citations All' value in the page.")


def format_citations(count):
    if count >= 10000:
        display = math.floor(count / 1000) / 10
        return f"{display:.1f}万余次"

    return f"{count}余次"


def format_citations_exact(count):
    return f"{count:,}"


def replace_placeholder(target_html, pattern, replacement, description):
    updated_html, replacements = re.subn(
        pattern,
        replacement,
        target_html,
        count=1,
        flags=re.DOTALL,
    )

    if replacements != 1:
        raise ValueError(f"Could not find the {description} placeholder.")

    return updated_html


def update_html_targets(activities_target, index_target, formatted_text, exact_text):
    target_path = Path(activities_target)
    target_html = target_path.read_text(encoding="utf-8")
    updated_html = replace_placeholder(
        target_html,
        r'(<span id="scholar-citations-text">)(.*?)(</span>)',
        r"\g<1>" + formatted_text + r"\g<3>",
        "Activities.html scholar citation",
    )
    target_path.write_text(updated_html, encoding="utf-8")

    index_path = Path(index_target)
    index_html = index_path.read_text(encoding="utf-8")
    updated_index_html = replace_placeholder(
        index_html,
        r'(<span id="scholar-citations-exact">)(.*?)(</span>)',
        r"\g<1>" + exact_text + r"\g<3>",
        "index.html scholar citation",
    )
    index_path.write_text(updated_index_html, encoding="utf-8")


def main():
    args = parse_args()
    html = load_html(args)
    citations_all = extract_citations_all(html)
    payload = {
        "source": args.url,
        "citations_all": citations_all,
        "formatted_text": format_citations(citations_all),
        "exact_text": format_citations_exact(citations_all),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    update_html_targets(
        args.html_target,
        "index.html",
        payload["formatted_text"],
        payload["exact_text"],
    )

    print(payload["formatted_text"])


if __name__ == "__main__":
    main()
