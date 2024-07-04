import { marked } from "marked";
import { useInputStore } from "../store";
import purify from "dompurify";

marked.use({
  gfm: true,
});
function Preview() {
  const input = useInputStore((state) => state.input);
  const markdown = marked(input);

  function convertLists(input) {
    const convertListItems = (text) => {
      return text.replace(/<li>([\s\S]*?)<\/li>/g, (match, content) => {
        const processedContent = convertLists(content);
        return `[*]${processedContent}`;
      });
    };

    const convertListsUnified = (text) => {
      return text.replace(
        /<(ul|ol)>([\s\S]*?)<\/\1>/g,
        (match, listType, content) => {
          const processedContent = convertListItems(content);
          const bbCodeTag = listType === "ol" ? "[list=1]" : "[list]";
          return `${bbCodeTag}${processedContent}[/list]`;
        }
      );
    };

    return convertListsUnified(input);
  }

  const converter = (input) => {
    input = input.replace(/<strong>*(.*?)<\/strong>/g, "[b]$1[/b]");
    input = input.replace(/<em>*(.*?)<\/em>/g, "[i]$1[/i]");
    input = input.replace(/<h2>*(.*?)<\/h2>/g, "[heading=1]$1[/heading]");
    input = input.replace(/<h3>*(.*?)<\/h3>/g, "[heading=2]$1[/heading]");
    input = input.replace(/<h4>*(.*?)<\/h4>/g, "[heading=3]$1[/heading]");
    input = input.replace(/<code>*(.*?)<\/code>/g, "[icode]$1[/icode]");
    input = input.replace(
      /<pre><code class="language-(.*?)">(.*?)<\/code><\/pre>/gs,
      (lang, code) => {
        const trimmedCode = code.trim();
        return `[code=${lang}]${trimmedCode}[/code]`;
      }
    );
    input = input.replace(
      /<pre><code>(.*?)<\/code><\/pre>/gs,
      (code) => {
        const trimmedCode = code.trim();
        return `[code]${trimmedCode}[/code]`;
      }
    );
    input = convertLists(input);
    input = input.replace(/<hr>/g, "[hr][/hr]");
    input = input.replace(/<a href="(.*?)">(.*?)<\/a>/g, "[url='$1']$2[/url]");
    input = input.replace(/<del>(.*?)<\/del>/g, "[s]$1[/s]");
    input = input.replace(
      /<blockquote>(.*?)<\/blockquote>/gs,
      (content) => {
        const cleanedContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
        return `[quote]${cleanedContent}[/quote]`;
      }
    );

    return input;
  };

  return (
    <div className="w-1/2 h-full  px-4 overflow-y-auto">
      <pre
        dangerouslySetInnerHTML={{
          __html: purify.sanitize(converter(markdown)),
        }}
        className="break-words whitespace-pre-wrap overflow-hidden"
      ></pre>
    </div>
  );
}

export default Preview;
