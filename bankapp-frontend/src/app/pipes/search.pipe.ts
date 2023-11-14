import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransaction:any[],searchTerm:string,propsName:string): any[] {
    const result:any[]=[];
    if(!allTransaction||searchTerm==''|| propsName==''){
      return allTransaction
    }
    allTransaction.forEach((item:any)=>{
      if(item[propsName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  

  }

}
