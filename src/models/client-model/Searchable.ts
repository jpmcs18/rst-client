export default interface Searchable {
  key: string | '';
  itemCount: number | 10;
  currentPage: number | 1;
  pageCount: number | 0;
  initiateSearch: boolean | true;
}
