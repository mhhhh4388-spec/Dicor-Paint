// تم وضع الـ Project ID الخاص بك[cite: 6]
const PROJECT_ID = 'td7vyie0'; 
const DATASET = 'production'; 

// تم تحديث الاستعلام لجلب حقل gallery (الصور المتعددة) بجانب البيانات الأخرى
const QUERY = encodeURIComponent('*[_type == "product"]{title, description, category, "imageUrl": image.asset->url, "gallery": gallery[].asset->url}');
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

async function fetchProducts() {
  try {
    const response = await fetch(URL);
    const { result } = await response.json();

    // جلب الحاويات من ملف HTML[cite: 6]
    const interiorContainer = document.getElementById('interior-products-container');
    const exteriorContainer = document.getElementById('exterior-products-container');
    
    // التأكد من أن الحاويات فارغة قبل الإضافة[cite: 6]
    if (interiorContainer) interiorContainer.innerHTML = '';
    if (exteriorContainer) exteriorContainer.innerHTML = '';

    // المرور على كل منتج قادم من Sanity[cite: 6]
    result.forEach(product => {
      
      // بناء كود الـ HTML الخاص بالصور المتعددة (Gallery) إن وجدت
      let galleryHTML = '';
      if (product.gallery && product.gallery.length > 0) {
        galleryHTML = '<div class="product-gallery-list" style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">';
        product.gallery.forEach(imgUrl => {
          galleryHTML += `<img src="${imgUrl}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(212, 175, 55, 0.3);">`;
        });
        galleryHTML += '</div>';
      }

      // بناء هيكل HTML للمنتج الواحد مع إدراج الصور المتعددة
      const productHTML = `
        <div class="pc">
          <div class="pc-ic">
            <img src="${product.imageUrl}" alt="${product.title}">
          </div>
          <div class="pc-t">${product.title}</div>
          <p class="pc-d">${product.description}</p>
          ${galleryHTML}
        </div>
      `;

      // توزيع المنتج في القسم المناسب بناءً على تصنيفه[cite: 6]
      if (product.category === 'interior' && interiorContainer) {
        interiorContainer.innerHTML += productHTML;
      } else if (product.category === 'exterior' && exteriorContainer) {
        exteriorContainer.innerHTML += productHTML;
      }
    });
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
  }
}

// تشغيل الدالة[cite: 6]
fetchProducts();
