import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

   transform(value:any,searchfilter:any): any {
    return value.filter((response:any)=>{
      return response.name.toLowerCase().indexOf(searchfilter) > -1;
    });
  }

}
