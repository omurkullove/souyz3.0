import { withTranslate } from '@i18n/withTranslate';
import 'filepond/dist/filepond.min.css';
import { FilePond } from 'react-filepond';

const acceptedFileTypes = ['image/*', 'application/*'];

interface IFileInputProps {
    files: File[];
    setFiles: (files: File[]) => void;
    className: string;
    translated: IntlMessages['FileInput'];
    name: string;
    setIsDisabled: (isDisabled: boolean) => void;
}

const FileInput = ({
    className,
    files,
    setFiles,
    translated,
    name,
    setIsDisabled,
}: IFileInputProps) => {
    const processFile = (
        fieldName: string,
        file: any,
        metadata: any,
        load: any,
        error: any,
        progress: any,
        abort: any
    ) => {
        const fileType = file.type;
        const isValidType = acceptedFileTypes.some((type) => {
            const regex = new RegExp(`^${type.replace('*', '.*')}$`);
            return regex.test(fileType);
        });

        if (!isValidType) {
            error();
            setIsDisabled(false);
            return;
        }
        let interval: NodeJS.Timeout;

        const simulateUpload = () => {
            let progressValue = 0;

            interval = setInterval(() => {
                progressValue += 0.1;
                progress(true, progressValue, 1);
                if (progressValue >= 1) {
                    clearInterval(interval);
                    load(file.name);
                }
            }, 100);
        };

        simulateUpload();

        return {
            abort: () => {
                clearInterval(interval);
                abort();
            },
        };
    };

    return (
        <FilePond
            className={className}
            files={files}
            onaddfilestart={() => setIsDisabled(true)}
            onprocessfiles={() => setIsDisabled(false)}
            allowMultiple={true}
            maxFiles={5}
            server={{
                process: processFile,
            }}
            name={name}
            labelIdle={translated.labelIdle}
            onupdatefiles={(fileItems) => {
                setFiles(fileItems.map((fileItem) => fileItem.file as File));
            }}
            labelFileProcessingError={translated.labelFileProcessingError}
            labelFileProcessing={translated.labelFileProcessing}
            labelButtonRemoveItem={translated.labelButtonRemoveItem}
            labelTapToUndo={translated.labelTapToUndo}
            labelTapToCancel={translated.labelTapToCancel}
            labelTapToRetry={translated.labelTapToRetry}
            labelFileProcessingComplete={translated.labelFileProcessingComplete}
        />
    );
};

export default withTranslate(FileInput, ['FileInput']);
