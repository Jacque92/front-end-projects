import React from "react";
import { useState } from "react";
import { marked } from "marked";

export const MarkdownPreviewer = () => {
  const initialstate = `
This is a paragraph

**This is bolded text**

> Block Quotes!

# Heading
## Heading 2
### Heading 3

- list item 1
- list item 2
- list item 3

[Visit Unsplash Website](https://unsplash.com/)

This is a inline \`<div></div>\`

This is a block of code

\`\`\`
    let x=1;
    let y=2;
    let z=x+y;
\`\`\`

![image](https://cdn-icons.flaticon.com/png/512/6143/premium/6143312.png?token=exp=1638316355~hmac=7c4c068700778f13824e5c4376c61510)
  `;
  const [text, setText] = useState(initialstate);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const markdown = marked(text, { breaks: true });

  return (
    <div className="page">
      <div className="markdownPreviewer">
        <section>
          <div className="toolbar">
            <h1>Editor</h1>
          </div>
          <textarea
            className="input"
            type="text"
            onChange={handleChange}
            value={text}
          ></textarea>
        </section>

        <section>
          <div className="toolbar">
            <h1>Previewer</h1>
          </div>
          <div
            className="output"
            dangerouslySetInnerHTML={{ __html: markdown }}
          ></div>
        </section>
      </div>
    </div>
  );
};
