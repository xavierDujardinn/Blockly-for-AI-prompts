Blockly.Blocks['IDENT'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("IDENT");
    
    this.appendDummyInput()
        .appendField("Schéma :")
        .appendField("NLD-P");
    
    this.appendDummyInput()
        .appendField("Assistant :")
        .appendField(new Blockly.FieldDropdown([
            ["Evalyn", "EVALYN"], 
            ["Unknown", "UNKNOWN"]
        ]), "ASSISTANT");

    this.appendDummyInput()
        .appendField("Mode :")
        .appendField(new Blockly.FieldDropdown([
            ["Essay Proofreader", "ESSAY_PROOFREADER"],
            ["Creative Writer", "CREATIVE_WRITER"],
            ["Code Optimizer", "CODE_OPTIMIZER"],
            ["General Assistant", "GENERAL"]
        ]), "MODE");

    this.appendDummyInput()
        .appendField("Type :")
        .appendField("declarative_guidance");

    this.appendDummyInput()
        .appendField("Version :")
        .appendField("2.0");

    this.appendStatementInput("STACK")
        .setCheck(["IDENT_INNER"]);

    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setColour("#bdb326");
    this.setTooltip("En-tête d'identification du framework NLD-P");
  }
};

javascript.javascriptGenerator.forBlock['IDENT'] = function(block) {
  const assistant = block.getFieldValue('ASSISTANT').toLowerCase();
  const mode = block.getFieldValue('MODE').toLowerCase();
  
  let code = "[IDENT]\n";
  code += "schema = NLD-P\n";
  code += "assistant = " + assistant + "\n";
  code += "mode = " + mode + "\n";
  code += "type = declarative_guidance\n";
  code += "version = 2.0\n\n";

  let branch = javascript.javascriptGenerator.statementToCode(block, 'STACK');
  if (!branch.trim()) {
    block.setWarningText("La section IDENT ne peut pas être vide ! Ajoute un des éléments pour faire ton beau prompt.");
    return '[IDENT]\n# ERREUR : Section vide\n';
  } else {
    block.setWarningText(null);
  }

  code += branch;

  return code;
};