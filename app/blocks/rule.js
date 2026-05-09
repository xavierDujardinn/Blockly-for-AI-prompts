Blockly.Blocks['RULE'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Règles")
    this.appendStatementInput("STACK")
        .setCheck(["RULE_INNER"]);
    this.setPreviousStatement(true, "IDENT_INNER");
    this.setNextStatement(true, "IDENT_INNER");
    this.setColour("#c9352a");
  }
};

javascript.javascriptGenerator.forBlock['RULE'] = function(block) {
  let branch = javascript.javascriptGenerator.statementToCode(block, 'STACK');
  
  if (!branch.trim()) {
    block.setWarningText("La section RULE ne peut pas être vide ! Ajoute un style de sortie ou une audience cible.");
    return '[RULE]\n<span class="warning"># ERREUR : Section vide\n</span>';
  } else {
    block.setWarningText(null);
  }

  return '[RULE]\n' + branch;
};

Blockly.Blocks['RULE:OUTPUT_STYLE'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Style de sortie");

    this.appendDummyInput()
        .appendField("ton :")
        .appendField(new Blockly.FieldDropdown([
            ["formel", "FORMAL"], 
            ["informel", "INFORMAL"]
        ]), "TONE");

    this.appendDummyInput()
        .appendField("style :")
        .appendField(new Blockly.FieldDropdown([
            ["académique", "ACADEMIC"],
            ["familier", "FAMILIAR"],
            ["fantaisiste", "FANTAISY"]
        ]), "STYLE");

    this.appendDummyInput()
        .appendField("Forcer la clarté :")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "CLARITY");

    this.appendDummyInput()
        .appendField("format :")
        .appendField(new Blockly.FieldDropdown([
            ["texte_uniquement", "TEXT_ONLY"],
            ["code_uniquement", "CODE_ONLY"],
        ]), "FORMAT");

    this.setPreviousStatement(true, "RULE_INNER");
    this.setNextStatement(true, "RULE_INNER");
    this.setColour("#c9352a");
    this.setTooltip("Définit les contraintes de style de la réponse.");
  }
};

javascript.javascriptGenerator.forBlock['RULE:OUTPUT_STYLE'] = function(block) {
  const tone = block.getFieldValue('TONE').toLowerCase();
  const style = block.getFieldValue('STYLE').toLowerCase();
  const clarity = block.getFieldValue('CLARITY') === 'TRUE' ? 'true' : 'false';
  const format = block.getFieldValue('FORMAT').toLowerCase();
  
  let code = "[RULE:OUTPUT_STYLE]\n";
  code += "tone = " + tone + "\n";
  code += "style = " + style + "\n";
  code += "enforce_clarity = " + clarity + "\n";
  code += "format = " + format + "\n\n";
  
  return code;
};

const AUDIENCE_DEFAULT_TEXT = "audience";

Blockly.Blocks['RULE:AUDIENCE'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Audience :")
        .appendField(new Blockly.FieldTextInput(AUDIENCE_DEFAULT_TEXT), "AUDIENCE_TEXT");
    
    this.setPreviousStatement(true, "RULE_INNER");
    this.setNextStatement(true, "RULE_INNER");
    this.setColour("#c9352a");
    this.setTooltip("Définit le public cible pour adapter le niveau de langage.");
  }
};

javascript.javascriptGenerator.forBlock['RULE:AUDIENCE'] = function(block) {
  const audience = block.getFieldValue('AUDIENCE_TEXT');

  if (block.getFieldValue('AUDIENCE_TEXT').trim() === AUDIENCE_DEFAULT_TEXT) {
    return `<span class=\"warning\"># ERREUR :donne une valeur à l'audience</span>\n`;
  } else {
    return `[RULE:AUDIENCE]\n` + audience + `\n\n`;
  }
};