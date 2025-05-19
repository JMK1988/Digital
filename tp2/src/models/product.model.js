class ProductModel {
    static products = [];

    static async getAllProducts() {
        return this.products;
    }

    static async addProduct(product) {
        product.id = this.products.length ? 
            Math.max(...this.products.map(p => p.id)) + 1 : 1;
        this.products.push(product);
        return product;
    }

    static async deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = ProductModel;