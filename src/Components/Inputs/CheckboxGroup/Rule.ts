import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import BooleanInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/BooleanInput";
import StringInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import colorRule from "Base/RXNode/Configs/colorRule";
import itemsRule from "Base/RXNode/Configs/itemsRule";
import { MetaConfig } from "Base/RXNode/MetaConfig";
import sizeRule from "Base/RXNode/Configs/sizeRule";

export class CheckboxGroupRule extends MetaConfig{
  //editPaddingY = '';
  //editPaddingX = '';
  //empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      {
        name:'label',
        label:'label',
        input:StringInput,
      },
      colorRule,
      sizeRule,
      {
        name:'row',
        label:'row-show',
        input:BooleanInput,
      },
      {
        name:'helperText',
        label:'helper-text',
        input:StringInput,
      },
      itemsRule
    ]
  }

}