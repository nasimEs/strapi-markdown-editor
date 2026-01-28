import React from 'react';
import { useIntl } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { Box, Flex, Typography } from '@strapi/design-system';
const mdParser = new MarkdownIt();
const MarkdownInput = ({ name, value, onChange, attribute, intlLabel, description, error, disabled, required, }) => {
    const { formatMessage } = useIntl();
    const label = intlLabel ? formatMessage(intlLabel) : name;
    return (React.createElement(Flex, { direction: "column", gap: 1 },
        React.createElement(Typography, { variant: "pi", fontWeight: "bold" },
            label,
            " ",
            required && '*'),
        React.createElement(Box, null,
            React.createElement(MdEditor, { value: value || '', style: { height: '300px' }, renderHTML: (text) => mdParser.render(text), readOnly: disabled, onChange: ({ text }) => {
                    onChange({
                        target: {
                            name,
                            value: text,
                            type: attribute.type,
                        },
                    });
                } })),
        error ? (React.createElement(Typography, { variant: "pi", textColor: "danger600" }, error)) : description ? (React.createElement(Typography, { variant: "pi", textColor: "neutral600" }, description)) : null));
};
export default MarkdownInput;
