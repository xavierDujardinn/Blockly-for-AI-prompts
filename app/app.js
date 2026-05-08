// Toolbox
const toolbox = {
  'kind': 'flyoutToolbox',
  'contents': [
    {'kind': 'block','type': 'IDENT'},
    {'kind': 'block','type': 'RULE'},
    {'kind': 'block','type': 'RULE:OUTPUT_STYLE'},
    {'kind': 'block','type': 'RULE:AUDIENCE'},
    {'kind': 'block','type': 'CONTENT'},
    {'kind': 'block','type': 'CONTENT:CONTEXT'},
    {'kind': 'block','type': 'CONTENT:TASK'},
    {'kind': 'block','type': 'POSTCHECK'}
  ]
};

// link blockly to blocklyDiv
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolbox,
  scrollbars: false,
  move: {
    scrollbars: false,
    drag: false,
    wheel: false
  },
  maxInstances: {
    'IDENT': 1,
    'RULE': 1,
    'RULE:OUTPUT_STYLE': 1,
    'RULE:AUDIENCE': 1,
    'CONTENT': 1,
    'CONTENT:CONTEXT': 1,
  }
});

// Remove indentation for generated text
javascript.javascriptGenerator.INDENT = '';

// Initialize workspace with a default IDENT block
const initialBlock = workspace.newBlock('IDENT');
initialBlock.initSvg();
initialBlock.render();
initialBlock.moveBy(20, 20);
initialBlock.setDeletable(false);

// Update prompt on workspace changes
function updatePrompt(event) {
  const code = javascript.javascriptGenerator.workspaceToCode(workspace);
  document.getElementById('promptResult').innerText = code;
}
workspace.addChangeListener(updatePrompt);

// Resize Blockly workspace on window resize
window.addEventListener('resize', function() {
    Blockly.svgResize(workspace);
}, false);
Blockly.svgResize(workspace);