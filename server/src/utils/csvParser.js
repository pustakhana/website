const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const parseCSVFiles = () => {
  return new Promise((resolve, reject) => {
    const catalogPath = path.join(__dirname, '../../data/catelog - Catalog File.csv');
    const listingPath = path.join(__dirname, '../../data/Untitled spreadsheet - Listing file.csv');
    
    // Check if files exist
    if (!fs.existsSync(catalogPath)) {
      return reject(new Error(`Catalog file not found at ${catalogPath}`));
    }
    if (!fs.existsSync(listingPath)) {
      return reject(new Error(`Listing file not found at ${listingPath}`));
    }

    const catalogData = {};
    const listingData = {};

    // Parse catalog file
    fs.createReadStream(catalogPath)
      .pipe(csv())
      .on('data', (row) => {
        if (row['Seller SKU ID']) {
          catalogData[row['Seller SKU ID']] = {
            isbn13: row['ISBN13'],
            isbn10: row['ISBN10'],
            title: row['Title'],
            author: row['Author'],
            publisher: row['Publisher'],
            binding: row['Binding'],
            language: row['Language'],
            bookSubcategory: row['Book Subcategory'],
            mainImageUrl: row['Main Image URL'],
            otherImageUrls: [
              row['Other Image URL 1'],
              row['Other Image URL 2'],
              row['Other Image URL 3'],
              row['Other Image URL 4'],
              row['Other Image URL 5'],
              row['Other Image URL 6'],
              row['Other Image URL 7'],
              row['Other Image URL 8'],
              row['Other Image URL 9'],
              row['Other Image URL 10'],
            ].filter(Boolean),
            edition: row['Edition'],
            publicationYear: parseInt(row['Publication Year']) || null,
            pages: parseInt(row['Pages']) || null,
            genre: row['Genre'],
            bookCategory: row['Book Category'],
            description: row['Description'],
            aboutAuthor: row['About Author'],
          };
        }
      })
      .on('end', () => {
        // Parse listing file
        fs.createReadStream(listingPath)
          .pipe(csv())
          .on('data', (row) => {
            if (row['Seller SKU Id']) {
              listingData[row['Seller SKU Id']] = {
                mrp: parseInt(row['MRP']) || 0,
                sellingPrice: parseInt(row['Your Selling Price']) || 0,
                stockCount: parseInt(row['System Stock count']) || 100,
              };
            }
          })
          .on('end', () => {
            // Merge data
            const mergedBooks = [];
            Object.keys(catalogData).forEach((skuId) => {
              const catalog = catalogData[skuId];
              const listing = listingData[skuId] || { mrp: 999, sellingPrice: 499, stockCount: 100 };

              mergedBooks.push({
                sellerSkuId: skuId,
                ...catalog,
                ...listing,
              });
            });

            console.log(`✓ Parsed ${mergedBooks.length} books from CSV files`);
            resolve(mergedBooks);
          })
          .on('error', reject);
      })
      .on('error', reject);
  });
};

module.exports = { parseCSVFiles };
