import React from 'react';
import { useIntl } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { Box, Flex, Typography } from '@strapi/design-system';

interface Props {
    name: string;
    value?: string;
    onChange: (e: { target: { name: string; value: string; type: string } }) => void;
    attribute: { type: string };
    intlLabel: { id: string; defaultMessage: string };
    description?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
}

const mdParser = new MarkdownIt();

const MarkdownInput: React.FC<Props> = ({
                                            name,
                                            value,
                                            onChange,
                                            attribute,
                                            intlLabel,
                                            description,
                                            error,
                                            disabled,
                                            required,
                                        }) => {
    const { formatMessage } = useIntl();

    const label = intlLabel ? formatMessage(intlLabel) : name;

    return (
        <Flex direction="column" gap={1}>
            <Typography variant="pi" fontWeight="bold">
                {label} {required && '*'}
            </Typography>

            <Box>
                <MdEditor
                    value={value || ''}
                    style={{ height: '300px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    readOnly={disabled}
                    onChange={({ text }) => {
                        onChange({
                            target: {
                                name,
                                value: text,
                                type: attribute.type,
                            },
                        });
                    }}
                />
            </Box>

            {error ? (
                <Typography variant="pi" textColor="danger600">
                    {error}
                </Typography>
            ) : description ? (
                <Typography variant="pi" textColor="neutral600">
                    {description}
                </Typography>
            ) : null}
        </Flex>
    );
};

export default MarkdownInput;
