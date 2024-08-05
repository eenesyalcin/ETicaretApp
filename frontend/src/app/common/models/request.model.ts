// Pagination yapısını kullandığımızda istenilecek bir model oluşturduk.
export class RequestModel{
    pageNumber: number = 1;
    pageSize: number = 10;
    search: string = "";
}
