import { ChangeCodeMirrorLanguage,linkPlugin,listsPlugin, UndoRedo,
    ListsToggle,
    InsertTable,
    InsertFrontmatter,
    CodeToggle,
    StrikeThroughSupSubToggles,
    MultipleChoiceToggleGroup,
    linkDialogPlugin,
    thematicBreakPlugin,
    diffSourcePlugin,
    tablePlugin,
    KitchenSinkToolbar,
    headingsPlugin,
    BoldItalicUnderlineToggles, ConditionalContents, InsertCodeBlock, InsertSandpack, MDXEditor, SandpackConfig, ShowSandpackInfo, codeBlockPlugin, codeMirrorPlugin, sandpackPlugin, toolbarPlugin } from '@mdxeditor/editor'
  
import '@mdxeditor/editor/style.css'


interface MdxMdEditorPropsType{
    mdText?: string
    onTextChange?: (markdown?: string) => void
    placeHolder?: string
    height?: string
}

const MDXMarkdownEditor = (props: MdxMdEditorPropsType)=>{

return (<>
<div style={{
    border: '1px solid #ccc',
    borderRadius: '8px', // Optional: Rounded corners
    padding: '10px', // Optional: Inner padding
    height: props?.height ?? '500px',
    overflow: 'auto',
    zIndex: 9999
  }}>
<MDXEditor
  markdown={props?.mdText ?? ''}
  onChange={props?.onTextChange}
  
  placeholder={props?.placeHolder}
  plugins={[
    // Include necessary plugins
    listsPlugin(),
    headingsPlugin(),
    linkPlugin(),
    codeBlockPlugin({defaultCodeBlockLanguage: 'js'}),
    tablePlugin(),
    linkDialogPlugin(),
    thematicBreakPlugin(),
    diffSourcePlugin(),
    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),

    // Configure the toolbar
    toolbarPlugin({
      toolbarContents: () => (
        <>
          <KitchenSinkToolbar/>
        </>
      ),
    }),
  ]}
/>
</div>
</>)
}

export default MDXMarkdownEditor;