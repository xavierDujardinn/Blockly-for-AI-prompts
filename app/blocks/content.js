Blockly.Blocks['CONTENT'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Contenu")
    this.appendStatementInput("STACK")
        .setCheck(["CONTENT_INNER"]);
    this.setPreviousStatement(true, "IDENT_INNER");
    this.setNextStatement(true, "IDENT_INNER");
    this.setColour("#5e73a6");
  }
};

javascript.javascriptGenerator.forBlock['CONTENT'] = function(block) {
  let branch = javascript.javascriptGenerator.statementToCode(block, 'STACK');
  
  if (!branch.trim()) {
    block.setWarningText("La section CONTENT ne peut pas être vide ! Ajoute un contexte ou une tâche.");
    return '[CONTENT]\n<span class="warning"># ERREUR : Section vide\n</span>';
  } else {
    block.setWarningText(null);
  }

  return '[CONTENT]\n' + branch;
};

const CONTEXT_DEFAULT_TEXT = "contexte";
Blockly.Blocks['CONTENT:CONTEXT'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Contexte :")
        .appendField(new Blockly.FieldTextInput(CONTEXT_DEFAULT_TEXT), "CONTEXT_TEXT");
    
    this.setPreviousStatement(true, "CONTENT_INNER");
    this.setNextStatement(true, "CONTENT_INNER");
    this.setColour("#5e73a6");
    this.setTooltip("Définit les informations de base ou le sujet sur lequel l'IA doit travailler.");
  }
};

javascript.javascriptGenerator.forBlock['CONTENT:CONTEXT'] = function(block) {
  const context = block.getFieldValue('CONTEXT_TEXT');
  
  if (block.getFieldValue('CONTEXT_TEXT').trim() === CONTEXT_DEFAULT_TEXT) {
    return `<span class=\"warning\"># ERREUR :donne une valeur au contexte</span>\n`;
  } else {
    return `[CONTENT:CONTEXT]\n` + context + `\n\n`;
  }
};

const TASK_DEFAULT_TEXT = "tâche";
Blockly.Blocks['CONTENT:TASK'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tâche :")
        .appendField(new Blockly.FieldTextInput(TASK_DEFAULT_TEXT), "TASK_TEXT");
    
    this.setPreviousStatement(true, ["CONTENT_INNER", "TASK_CHAIN"]);
    this.setNextStatement(true, "TASK_CHAIN");
    this.setColour("#5e73a6");
    this.setTooltip("Définit l'action principale que l'IA doit accomplir.");
  }
};

javascript.javascriptGenerator.forBlock['CONTENT:TASK'] = function(block) {
  const task = block.getFieldValue('TASK_TEXT');

  const previousBlock = block.getPreviousBlock();
  let header = "";
  
  if (!previousBlock || previousBlock.type !== 'CONTENT:TASK') {
    header = "[CONTENT:TASK]\n";
  }

  if (block.getFieldValue('TASK_TEXT').trim() === TASK_DEFAULT_TEXT) {
    return `${header}<span class=\"warning\"># ERREUR :donne une valeur à la tâche</span>\n\n`
  } else {
    return `${header}\n${task}\n\n`;
  }
};