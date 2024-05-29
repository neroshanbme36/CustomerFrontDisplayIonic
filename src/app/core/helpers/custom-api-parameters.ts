import { CustomApiParams } from "../models/customApiParams";

export class CustomApiParameters {

    private pCustomParaList: CustomApiParams[] = [];

    public get customParaList() {
      return this.pCustomParaList;
    }

    public addCustomParameter(keyParam: string, valueParam: string): CustomApiParameters {
        let customPara = new CustomApiParams();
        customPara = {key: keyParam, value: valueParam};
        this.pCustomParaList.push(customPara);
        return this;
    }
}
