import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataRow {
  id: string;
  year: string;
  value: string;
}

const Index = () => {
  const [year, setYear] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState<DataRow[]>([]);

  const addRow = () => {
    if (year.trim() && value.trim()) {
      const newRow: DataRow = {
        id: Date.now().toString(),
        year: year.trim(),
        value: value.trim(),
      };
      setData([...data, newRow]);
      setYear('');
      setValue('');
    }
  };

  const deleteRow = (id: string) => {
    setData(data.filter((row) => row.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addRow();
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold text-foreground tracking-tight">
            Данные по годам
          </h1>
          <p className="text-muted-foreground text-lg">
            Добавьте данные в таблицу
          </p>
        </div>

        <Card className="p-8 shadow-sm border-border">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Год
                </label>
                <Input
                  type="text"
                  placeholder="2024"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 text-base border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Значение
                </label>
                <Input
                  type="text"
                  placeholder="1000"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 text-base border-border focus:ring-primary"
                />
              </div>
            </div>

            <Button
              onClick={addRow}
              className="w-full h-12 text-base font-medium"
              disabled={!year.trim() || !value.trim()}
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить данные
            </Button>
          </div>
        </Card>

        {data.length > 0 && (
          <Card className="p-8 shadow-sm border-border animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Таблица данных
              </h2>

              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">
                        Год
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Значение
                      </TableHead>
                      <TableHead className="w-[100px] text-right font-semibold text-foreground">
                        Действие
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-medium text-foreground">
                          {row.year}
                        </TableCell>
                        <TableCell className="text-foreground">
                          {row.value}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteRow(row.id)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
