class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      if (this.queryStr.keyword) {
        const keyword = {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        };
        this.query = this.query.find({ ...keyword });
      }
      return this;
    }
  
    filterByCategory() {
      if (this.queryStr.category) {
        this.query = this.query.where({
          categories: this.queryStr.category,
        });
      }
      return this;
    }
  
    filterByTag() {
      if (this.queryStr.tag) {
        this.query = this.query.where({
          tags: this.queryStr.tag,
        });
      }
      return this;
    }
  
    paginate(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resultPerPage * (currentPage - 1);
  
      this.query = this.query.limit(resultPerPage).skip(skip);
  
      return this;
    }
  }
  
  module.exports = ApiFeatures;
  