# /// script
# dependencies = ["fastmcp"]
# ///

from fastmcp import FastMCP
import re

mcp = FastMCP("NomadBridge-Tools")

@mcp.tool()
def change_verbs_to_name(sentence: str, name: str = "Mikhail") -> str:
    """Changes all verbs in a sentence to the given name (default: Mikhail)."""
    verbs = ["is", "are", "was", "were", "be", "being", "been", "have", "has", "had",
             "do", "does", "did", "will", "would", "shall", "should", "can", "could",
             "may", "might", "must", "go", "goes", "went", "come", "comes", "came"]
    words = sentence.split()
    result = []
    for word in words:
        lower = word.lower().strip(".,!?")
        if lower in verbs or lower.endswith("ing") or lower.endswith("ed"):
            result.append(name)
        else:
            result.append(word)
    return " ".join(result)

@mcp.tool()
def replace_name_with_keyword(text: str, keyword: str) -> str:
    """Replaces 'Mikhail' or 'Andreev' with any user-provided keyword."""
    result = re.sub(r'\bMikhail\b', keyword, text, flags=re.IGNORECASE)
    result = re.sub(r'\bAndreev\b', keyword, result, flags=re.IGNORECASE)
    return result

if __name__ == "__main__":
    print("Starting NomadBridge-Tools MCP server...")
    mcp.run()
