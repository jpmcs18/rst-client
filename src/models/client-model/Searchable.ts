export default interface Searchable {
  key: string | '';
  currentPage: number | 1;
  pageCount: number | 0;
  initiateSearch: boolean | true;
}
