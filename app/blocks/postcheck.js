const POSTCHECK_DEFAULT_TEXT = "condition";

Blockly.Blocks['POSTCHECK'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Post conditions");
    
    this.appendDummyInput()
        .appendField("Si")
        .appendField(new Blockly.FieldTextInput(POSTCHECK_DEFAULT_TEXT), "CONDITION_TEXT")
        .appendField("alors,")
        .appendField(new Blockly.FieldDropdown([
            ["réaliser une révision", "REVISION"], 
            ["réaliser une suppression", "SUPPRESSION"],
        ]), "ACTION_SELECT");


    this.setPreviousStatement(true, ["IDENT_INNER", "POSTCHECK_CHAIN"]);
    this.setNextStatement(true, "POSTCHECK_CHAIN");
    this.setColour("#428a6f");
    this.setTooltip("Définit une règle de vérification après la génération.");
  }
};

javascript.javascriptGenerator.forBlock['POSTCHECK'] = function(block) {
  let condition = block.getFieldValue('CONDITION_TEXT');
  let action = block.getFieldValue('ACTION_SELECT');
  
  const previousBlock = block.getPreviousBlock();
  let header = "";
  
  if (!previousBlock || previousBlock.type !== 'POSTCHECK') {
    header = "[POSTCHECK]\n";
  }

  if (block.getFieldValue('CONDITION_TEXT').trim() === POSTCHECK_DEFAULT_TEXT) {
    return `${header}<span class=\"warning\"># ERREUR :donne une valeur à la condition</span>\n\n`
  } else {
    return `${header}If ${condition}, flag for ${action.toLowerCase().replace('_', ' ')}.\n\n`;
  }
};