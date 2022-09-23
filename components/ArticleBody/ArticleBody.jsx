import React from 'react';
import Button from '../Button/Button';
import { Parser, ProcessNodeDefinitions } from "html-to-react";

const customElements = {
    "a": Button
};

const htmlParser = new Parser(React);

const processNodeDefinitions = new ProcessNodeDefinitions(React);

function isValidNode() {
  return true;
};



const ArticleBody = ({ 
    body, 
    onClick
}) => {
    const processingInstructions = [{
        shouldProcessNode: (node) => {
            return (node.name && customElements[node.name]);
        }, processNode: (node) => {
            let CustomElement = customElements[node.name];
            return <CustomElement text="Get Insurance"
            onClick={onClick} />;
        }
    }, {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode
    }];
  return htmlParser.parseWithInstructions(
    body, 
    isValidNode, 
    processingInstructions);
}

export default ArticleBody
