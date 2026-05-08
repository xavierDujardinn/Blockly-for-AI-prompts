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
    return '[CONTENT]\n# ERREUR : Section vide\n';
  } else {
    block.setWarningText(null);
  }

  return '[CONTENT]\n' + branch;
};

Blockly.Blocks['CONTENT:CONTEXT'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Contexte :")
        .appendField(new Blockly.FieldTextInput("contexte"), "CONTEXT_TEXT");
    
    this.setPreviousStatement(true, "CONTENT_INNER");
    this.setNextStatement(true, "CONTENT_INNER");
    this.setColour("#5e73a6");
    this.setTooltip("Définit les informations de base ou le sujet sur lequel l'IA doit travailler.");
  }
};

javascript.javascriptGenerator.forBlock['CONTENT:CONTEXT'] = function(block) {
  const context = block.getFieldValue('CONTEXT_TEXT');
  
  return "[CONTENT:CONTEXT]\n" + context + "\n\n";
};

Blockly.Blocks['CONTENT:TASK'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tâche :")
        .appendField(new Blockly.FieldTextInput("tâche"), "TASK_TEXT");
    
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
    header = "[CONTENT:TASK]:\n";
  }

  return `${header}\n${task}\n\n`;
};