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

  updateProgressBar();
}
workspace.addChangeListener(updatePrompt);

// Resize Blockly workspace on window resize
window.addEventListener('resize', function() {
    Blockly.svgResize(workspace);
}, false);
Blockly.svgResize(workspace);

// Method to update the progress bar
const updateProgressBar = () => {
    const allBlocks = workspace.getAllBlocks(false);
    const types = allBlocks.map(b => b.type);
    
    let score = 0;
    
    if (types.includes('IDENT')) score += 10;
    if (types.includes('RULE:OUTPUT_STYLE')) score += 20;
    if (types.includes('RULE:AUDIENCE')) score += 20;
    if (types.includes('CONTENT:CONTEXT')) score += 20;
    if (types.includes('CONTENT:TASK')) score += 20;
    if (types.includes('POSTCHECK')) score += 10;

    const bar = document.getElementById('progressBar');
    const text = document.getElementById('progressText');
    
    bar.style.width = score + '%';
    text.innerText = score + '%';

    if (score === 100) {
        bar.style.backgroundColor = '#4CAF50';
    } else {
        bar.style.backgroundColor = '#2196F3';
    }
}