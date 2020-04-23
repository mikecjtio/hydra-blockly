function addSpecialBlock(fn) {
  var categoryNode = toolbox.querySelector(`category[name="${hydraFnTypesToBlocklyCategories[fn.type].category}"]`);
  if(!categoryNode) {
    categoryNode = toolbox.parentNode.createElement('category');
    categoryNode.setAttribute('name', hydraFnTypesToBlocklyCategories[fn.type].category);
    categoryNode.setAttribute('colour', hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier);
    toolbox.appendChild(categoryNode);
  }
  switch(fn.name) {
    // adding block to scope variables created
    case 'number': {
      var blockXML = `<block type="math_number">
        <field name="NUM">0</field>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'text': {
      var blockXML = `<block type="text">
        <field name="TEXT">a.fft[0]</field>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'array': {
      blockXML = `<block type="lists_create_with">
        <mutation items="3"></mutation>
        <value name="ADD0">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
        <value name="ADD1">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
        <value name="ADD2">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'anon': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "anon",
        "message0": "( ) => ( %1 %2 )",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "fn",
            "check": "String"
          }
        ],
        "output": "Function",
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "implicit return",
        "helpUrl": ""
      }]);
      Blockly.JavaScript['anon'] = function(block) {
        var value_function = Blockly.JavaScript.valueToCode(block, 'fn', Blockly.JavaScript.ORDER_ATOMIC);
        value_function = value_function.substring(1, value_function.length - 1);
        return [`() => (${value_function})`, Blockly.JavaScript.ORDER_NONE];
      };
      var blockXML = `<block type="anon">
        <value name="fn">
          <block type="text">
            <field name="TEXT">a.fft[0]</field>
          </block>
        </value>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'out': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "out",
        "message0": ".out( buffer: %1 )",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "buffer",
            "options": [
              [
                "output0",
                "o0"
              ],
              [
                "output1",
                "o1"
              ],
              [
                "output2",
                "o2"
              ],
              [
                "output3",
                "o3"
              ]
            ]
          }
        ],
        "previousStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      Blockly.JavaScript['out'] = function(block) {
        var args = [
          block.getFieldValue('buffer'),
        ]
        return code(block, args);
      };
      var blockXML = `<block type="out">
        <field name="buffer">o0</field>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'webcam': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "webcam",
        "message0": "webcam(input: %1 )",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "buffer",
            "options": [
              [
                "webcam0",
                "0"
              ],
              [
                "webcam1",
                "1"
              ]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      // webcam mapped to s3
      Blockly.JavaScript['webcam'] = function(block) {
        var dropdown_buffer = block.getFieldValue('buffer');
        window.webcamSrc = dropdown_buffer
        return `src(s3)`
      };
      var blockXML = `<block type="webcam">
        <field name="input">0</field>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'image': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "image",
        "message0": "image(src: %1 )",
        "args0": [
          {
            "type": "field_input",
            "name": "src",
            "text": "https://upload.wikimedia.org/wikipedia/commons/a/aa/TwibrightLinksTestCard.png"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);

      // image mapped to s1
      Blockly.JavaScript['image'] = function(block) {
        var text_src = block.getFieldValue('src');
        window.imageSrc = text_src
        return `src(s1)`
      };
      var blockXML = `<block type="image">
        <field name="src">https://upload.wikimedia.org/wikipedia/commons/a/aa/TwibrightLinksTestCard.png</field>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break; 
    }
    case 'video': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "video",
        "message0": "video(src: %1 )",
        "args0": [
          {
            "type": "field_input",
            "name": "src",
            "text": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      // video mapped to s2
      Blockly.JavaScript['video'] = function(block) {
        var text_src = block.getFieldValue('src');
        window.videoSrc = text_src
        return `src(s2)`
      };
      var blockXML = `<block type="video">
        <field name="src">http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4</field>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
  }
}