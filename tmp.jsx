import EmailEditor from 'react-email-editor'
const EditFlow = () => {
    const {idTemplate} = useParams()
    const emailEditorRef = useRef(null)
    const [preview, setPreview] = useState(false)

    const saveDesign = () => {
        emailEditorRef.current?.editor?.saveDesign((design) => {
            previewTemplate.body = design.body;
            traverseBody(previewTemplate.body.rows);
            console.log('saveDesign', design);
        });
    };


    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            let json = data.design;
            console.log('Json', json);
            const {design, html} = data;
            console.log('exportHtml', html);
        });
    };

    const togglePreview = () => {
        if (preview) {
            emailEditorRef.current?.editor?.hidePreview();
            setPreview(false);
        } else {
            emailEditorRef.current?.editor?.showPreview('desktop');
            setPreview(true);
        }
    };

    const onDesignLoad = (data) => {
        console.log('Loaded')
    };

    const onReady = async () => {

        console.log('onLoad');

        emailEditorRef.current?.editor?.addEventListener(
            'design:loaded',
            onDesignLoad
        );

        emailEditorRef.current?.editor?.loadDesign({
            customJs: ['../custom_tool/basicCustom.js'],
        });


    };

    return (
        <div>
            <Button primary id='button1' onClick={exportHtml}>Export template</Button>
            <Button onClick={togglePreview}>{preview ? 'Hide' : 'Show'}Preview</Button>
            <Button primary id='button1' onClick={saveDesign}>Save template</Button>
            <Button destructive url='/dashboard'>Leave</Button>
            <EmailEditor editorId={`editor-container`}  ref={emailEditorRef} onLoad={onLoad} onReady={onReady} minHeight={750}/>
        </div>
    );
};

export default EditFlow