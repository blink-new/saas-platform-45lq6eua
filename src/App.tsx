import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, LineChart } from 'lucide-react';

// Sample data - replace with actual data fetching later
const sampleProducts = [
  { id: 1, name: 'لپ تاپ ایسوس مدل X', seller: 'دیجی کالا', price: '25,000,000 تومان', source: 'Digikala', link: 'https://digikala.com/product-1' },
  { id: 2, name: 'لپ تاپ ایسوس مدل X', seller: 'فروشگاه الف', price: '24,500,000 تومان', source: 'Torob', link: 'https://torob.com/seller-a/product-1' },
  { id: 3, name: 'گوشی سامسونگ S23', seller: 'ایمالز استور', price: '30,000,000 تومان', source: 'Emalls', link: 'https://emalls.ir/store-b/product-2' },
  { id: 4, name: 'گوشی سامسونگ S23', seller: 'دیوار یوزر ۱۲۳', price: '28,000,000 تومان', source: 'Divar', link: 'https://divar.ir/user-123/product-2' },
  { id: 5, name: 'تلویزیون ال جی سایز ۵۵', seller: 'دیجی کالا', price: '18,000,000 تومان', source: 'Digikala', link: 'https://digikala.com/product-3' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(sampleProducts);

  // Debounce function
  const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const performSearch = (currentSearchTerm: string) => {
    if (!currentSearchTerm.trim()) {
      setSearchResults(sampleProducts); // Show all if search is empty
      return;
    }
    const filteredResults = sampleProducts.filter(product =>
      product.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  // Debounced search function
  const debouncedSearch = debounce(performSearch, 300); // 300ms delay

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]); // Re-run effect when searchTerm changes

  const handleSearchButtonClick = () => {
    // Perform search immediately on button click, bypassing debounce
    performSearch(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-primary-600 dark:text-primary-400">
          موتور قیمت
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          قیمت محصولات را در فروشگاه‌های مختلف مقایسه کنید
        </p>
      </header>

      <main className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-6 w-6 text-primary-500" />
              جستجوی محصول
            </CardTitle>
            <CardDescription>
              نام محصول مورد نظر خود را برای مقایسه قیمت وارد کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2 space-x-reverse">
              <Input
                type="text"
                placeholder="مثلا: لپ تاپ ایسوس مدل Zenbook"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                dir="rtl"
              />
              <Button type="button" onClick={handleSearchButtonClick} className="bg-primary-600 hover:bg-primary-700 text-white">
                <Search className="ml-2 h-4 w-4" /> {/* ml-2 for RTL */}
                جستجو
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-6 w-6 text-green-500" />
              نتایج و تحلیل قیمت
            </CardTitle>
            <CardDescription>
              جدول قیمت‌ها و نمودار تحلیل وضعیت عرضه در بازار.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table dir="rtl">
                <TableCaption className="mt-4">لیست قیمت‌های یافت شده برای محصول.</TableCaption>
                <TableHeader>
                  <TableRow className="dark:border-gray-700">
                    <TableHead className="text-right">محصول</TableHead>
                    <TableHead className="text-right">فروشنده</TableHead>
                    <TableHead className="text-right">قیمت</TableHead>
                    <TableHead className="text-right">منبع</TableHead>
                    <TableHead className="text-right">لینک</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((product) => (
                    <TableRow key={product.id} className="dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.seller}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          product.source === 'Digikala' ? 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300' :
                          product.source === 'Torob' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' :
                          product.source === 'Emalls' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300' :
                          product.source === 'Divar' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300'
                        }`}>
                          {product.source}
                        </span>
                      </TableCell>
                      <TableCell>
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                          مشاهده
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-center">نمودار تحلیل قیمت (به زودی)</h3>
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                <p className="text-gray-500 dark:text-gray-400">
                  <LineChart className="inline-block h-12 w-12 mb-2 text-gray-400 dark:text-gray-500" />
                  <br />
                  داده‌های نمودار در اینجا نمایش داده خواهند شد.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} موتور قیمت. تمام حقوق محفوظ است.</p>
      </footer>
    </div>
  );
}

export default App;