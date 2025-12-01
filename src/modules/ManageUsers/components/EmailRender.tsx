import Button from 'components/Button/Button';
import Image from 'components/Image';
import ToolTip from 'components/Tooltip';
import { useEffect, useState } from 'react';

const EmailRender = ({ email }: { email: string }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    useEffect(() => {
        let timer: any;
        if (isCopied) {
            timer = setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [isCopied]);

    return (
        <div className="flex items-center justify-start w-full gap-2">
            <ToolTip value={email} spanClass="min-w-0" />
            {isCopied ? (
                <Button onClickHandler={(e) => e.stopPropagation()}>
                    <Image iconName="checkIcon" iconClassName="size-5 text-green-500" />
                </Button>
            ) : (
                <Button
                    onClickHandler={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(email).then(() => {
                            setIsCopied(true);
                        });
                    }}
                >
                    <Image iconName="copyIcon" iconClassName="size-5 text-gray-500" />
                </Button>
            )}
        </div>
    );
};

export default EmailRender;
