import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Trash2, Download, XCircle } from 'lucide-react';

interface FileInfo {
  name: string;
  type: string;
  dataUrl: string;
}

export const Fileupload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('alphavault_files');
    if (stored) {
      try {
        const parsed: FileInfo[] = JSON.parse(stored);
        setUploadedFiles(parsed);
      } catch (err) {
        console.error("Failed to parse stored files", err);
      }
    }
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileReaders: Promise<FileInfo>[] = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({ name: file.name, type: file.type, dataUrl: reader.result as string });
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(fileReaders).then((newFiles) => {
      const updated = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updated);
      localStorage.setItem('alphavault_files', JSON.stringify(updated));
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClear = () => {
    setUploadedFiles([]);
    localStorage.removeItem('alphavault_files');
  };

  const handleDelete = (index: number) => {
    const updated = [...uploadedFiles];
    updated.splice(index, 1);
    setUploadedFiles(updated);
    localStorage.setItem('alphavault_files', JSON.stringify(updated));
  };

  const renderPreview = (file: FileInfo) => {
    if (file.type.startsWith('image/')) {
      return <img src={file.dataUrl} alt={file.name} className="max-w-full h-40 object-contain" />;
    } else if (file.type === 'application/pdf') {
      return (
        <iframe
          src={file.dataUrl}
          title={file.name}
          className="w-full h-40 border rounded"
        />
      );
    } else if (file.type.startsWith('text/')) {
      return (
        <textarea
          readOnly
          value={atob(file.dataUrl.split(',')[1])}
          className="w-full h-32 bg-black text-white p-2 rounded resize-none"
        />
      );
    } else {
      return (
        <a
          href={file.dataUrl}
          download={file.name}
          className="text-vault-green underline text-sm"
        >
          Download {file.name}
        </a>
      );
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-vault-green neon-text">File Uploads</h2>
          <p className="text-sm text-vault-gray-light font-mono mt-1">Securely store and view your files locally</p>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            variant="web3"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-4 h-4" /> Upload
          </Button>
          <Button variant="destructive" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-2" /> Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uploadedFiles.map((file, idx) => (
          <Card key={idx} className="bg-vault-dark border border-vault-green/30">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-sm font-mono text-vault-green truncate w-40">{file.name}</CardTitle>
              <div className="flex gap-2">
                <a href={file.dataUrl} download={file.name}>
                  <Button size="icon" variant="ghost"><Download className="w-4 h-4" /></Button>
                </a>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(idx)}>
                  <XCircle className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>{renderPreview(file)}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Fileupload;
