import { Editor } from '@tinymce/tinymce-react';

// TinyMCE so the global var exists
import 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin';

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/help/js/i18n/keynav/en';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

// importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis';

// Content styles, including inline UI like fake cursors
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';



import { useEffect, useRef, useState } from 'react';

const  RichTextEditor = ({input, setInput}) => {
  const editorRef = useRef(null);

  const [isEditorReady, setIsEditorReady] = useState(false);

  // Set content ONCE after editor and description are both ready
  useEffect(() => {
    if (
      isEditorReady &&
      editorRef.current &&
      typeof input.description === "string"
    ) {
      editorRef.current.setContent(input.description);
    }
  }, [isEditorReady]);


  return (
    <>
      <Editor
        licenseKey='gpl'    //  important to add
        textareaName='content'
        onInit={(_evt, editor) => {
          editorRef.current = editor;
          setIsEditorReady(true);
        }}
        
        // initialValue= 'Write your content here'  //  won't update the value later on and contain the same static content and ignores everything
        initialValue= ""    //   Prevent static init value

        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
            'searchreplace', 'table', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={(newContent) =>
        setInput({ ...input, description: newContent })}
        // onEditorChange={(newContent) =>
        //   setInput((prev) => ({
        //     ...prev,
        //     description: newContent,
        //   }))
        // }
      />
    </>
  );
}

export default RichTextEditor





// 🔁 Visual Timeline Comparison
// Step	                          With initialValue=""	                With initialValue="Write here"
// Editor mounts	                  Shows empty	                            Shows Write here
// input.description arrives	      You call .setContent()	                You call .setContent()
// Result	                          Replaces content ✅	                   Gets ignored ❌

// 🧠 Rule of Thumb
// ✅ Use this	                                            ❌ Avoid this
// initialValue="" + setContent(...)	                    initialValue="..." with dynamic content
// Set editor content via ref after loading	              Expecting initialValue to update with props