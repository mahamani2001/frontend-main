import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterComponent implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      const itemTitle = item.title.toLowerCase();
      const itemDescription = item.description.toLowerCase();
      //const itemCategoryName = item.category?.name?.toLowerCase();
      const searchTextRegex = new RegExp(searchText, 'i');
      return searchTextRegex.test(itemTitle) ||
             searchTextRegex.test(itemDescription) 
           //  (itemCategoryName && searchTextRegex.test(itemCategoryName));
    });
    
    
  }
 
}
