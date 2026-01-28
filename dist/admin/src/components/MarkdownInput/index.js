import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useIntl } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { Box, Flex, Typography } from '@strapi/design-system';
import DOMPurify from 'dompurify';
const mdParser = new MarkdownIt();
const MarkdownInput = ({ name, value, onChange, attribute, intlLabel, description, error, disabled, required, }) => {
    const { formatMessage } = useIntl();
    const label = intlLabel ? formatMessage(intlLabel) : name;
    return (_jsxs(Flex, { direction: "column", gap: 1, children: [_jsxs(Typography, { variant: "pi", fontWeight: "bold", children: [label, " ", required && '*'] }), _jsx(Box, { children: _jsx(MdEditor, { value: value || '', style: { height: '300px' }, renderHTML: (text) => DOMPurify.sanitize(mdParser.render(text)), readOnly: disabled, onChange: ({ text }) => {
                        onChange({
                            target: {
                                name,
                                value: text,
                                type: attribute.type,
                            },
                        });
                    } }) }), error ? (_jsx(Typography, { variant: "pi", textColor: "danger600", children: error })) : description ? (_jsx(Typography, { variant: "pi", textColor: "neutral600", children: description })) : null] }));
};
export default MarkdownInput;
