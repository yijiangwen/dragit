import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable, toJS } from "mobx";
import { IModelNode } from "./IModelNode";
import { validate } from "./validate";

export interface IFieldStore extends IModelNode{
  meta:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;

  setValue: (value:any)=>void;
  setModel:(model: any)=>void;
  validate:()=>boolean;
}

export class FieldStore implements IFieldStore{
  meta:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;
  constructor(meta:IMeta) {
    makeAutoObservable(this);
    this.meta = meta;
  }

  setLoading(loading:boolean){
    this.loading = loading;
  }
  
  toFieldsGQL() {
    return ` ${this.meta?.props?.field} `;
  }

  setModel(model: any) {
    const fieldName = this.meta.props?.field;
    const fieldValue = model && fieldName ? model[fieldName] : undefined;
    this.defaultValue = fieldValue;
    this.value = fieldValue;
  }

  setValue(value: any) {
    this.value = value;
  }

  getModelNode(name:string):IModelNode|undefined{
    return undefined;
  }

  toInputValue(){
    return toJS(this.value);
  }

  validate(){
    this.error = validate(this.value, this.meta?.props?.rule);
    return !this.error;
  }
}


