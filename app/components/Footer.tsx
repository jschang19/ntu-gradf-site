export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              Created by <span className="font-medium underline"><a href="https://github.com/jschang19" target="_blank" rel="noopener noreferrer">jschang19</a></span>
            </p>
            <p className="text-xs text-gray-500">
              本網站僅供參考，正式資訊請以臺灣大學官方公告為準
            </p>
          </div>

          <div className="text-xs text-gray-500 max-w-md">
            <p className="mb-1">
              <strong>免責聲明：</strong>
            </p>
            <p>
              本網站提供的資訊僅供參考用途，不保證資訊的完整性、準確性或時效性。
              使用者應自行確認相關資訊的正確性，並以官方公告為準。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
