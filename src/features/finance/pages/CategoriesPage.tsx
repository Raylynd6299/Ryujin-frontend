import { useState } from 'react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { DeleteConfirmDialog } from '../components/shared/DeleteConfirmDialog';
import { CategoryForm } from '../components/categories/CategoryForm';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategories';
import { useTranslation } from '@/hooks/useTranslation';
import type { Category, UpdateCategoryRequest } from '@/types/finance.types';
import type { CategoryFormValues } from '../components/categories/CategoryForm';

export const CategoriesPage = () => {
    const { t } = useTranslation();
    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState<Category | null>(null);
    const [deleteItem, setDeleteItem] = useState<Category | null>(null);

    const { data: categories = [], isLoading } = useCategories();
    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();
    const deleteMutation = useDeleteCategory();

    const handleCreate = (values: CategoryFormValues) => {
        createMutation.mutate(
            {
                name: values.name,
                type: values.type,
                icon: values.icon || undefined,
                color: values.color || undefined,
            },
            {
                onSuccess: () => {
                    setCreateOpen(false);
                    createMutation.reset();
                },
            }
        );
    };

    const handleUpdate = (values: CategoryFormValues) => {
        if (!editItem) return;
        const data: UpdateCategoryRequest = {
            name: values.name,
            icon: values.icon || undefined,
            color: values.color || undefined,
        };
        updateMutation.mutate(
            { id: editItem.id, data },
            { onSuccess: () => setEditItem(null) }
        );
    };

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.id, { onSuccess: () => setDeleteItem(null) });
    };

    const typeVariant = (type: Category['type']) => {
        if (type === 'income') return 'default';
        if (type === 'expense') return 'destructive';
        return 'secondary';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{t('navigation.categories')}</h1>
                    <p className="text-muted-foreground">{t('finance.categoriesDescription')}</p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t('finance.addCategory')}
                </Button>
            </div>

            {/* Create Sheet */}
            <Sheet open={createOpen} onOpenChange={setCreateOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{t('finance.addCategory')}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 px-1">
                        <CategoryForm
                            onSubmit={handleCreate}
                            isPending={createMutation.isPending}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Edit Sheet */}
            <Sheet open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{t('finance.editCategory')}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 px-1">
                        {editItem && (
                            <CategoryForm
                                defaultValues={editItem}
                                onSubmit={handleUpdate}
                                isPending={updateMutation.isPending}
                                isEdit
                            />
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Delete Dialog */}
            <DeleteConfirmDialog
                open={!!deleteItem}
                onOpenChange={(open) => !open && setDeleteItem(null)}
                onConfirm={handleDelete}
                isPending={deleteMutation.isPending}
                itemName={deleteItem?.name}
            />

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-muted-foreground">{t('common.loading')}</p>
                </div>
            ) : categories.length > 0 ? (
                <>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('finance.name')}</TableHead>
                                    <TableHead>{t('finance.categoryType')}</TableHead>
                                    <TableHead>{t('finance.categoryIcon')}</TableHead>
                                    <TableHead>{t('finance.categoryColor')}</TableHead>
                                    <TableHead>{t('finance.status')}</TableHead>
                                    <TableHead className="w-[50px]">{t('common.actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((cat) => (
                                    <TableRow key={cat.id}>
                                        <TableCell className="font-medium">
                                            {cat.icon ? `${cat.icon} ` : ''}
                                            {cat.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={typeVariant(cat.type)}>
                                                {t(`finance.categoryTypes.${cat.type}`)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xl">{cat.icon || '—'}</span>
                                        </TableCell>
                                        <TableCell>
                                            {cat.color ? (
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-4 w-4 rounded-full border"
                                                        style={{ backgroundColor: cat.color }}
                                                    />
                                                    <span className="font-mono text-xs text-muted-foreground">
                                                        {cat.color}
                                                    </span>
                                                </div>
                                            ) : (
                                                '—'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={cat.isDefault ? 'secondary' : 'outline'}>
                                                {cat.isDefault
                                                    ? t('finance.defaultCategory')
                                                    : t('finance.customCategory')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setEditItem(cat)}>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        {t('common.edit')}
                                                    </DropdownMenuItem>
                                                    {!cat.isDefault && (
                                                        <DropdownMenuItem
                                                            onClick={() => setDeleteItem(cat)}
                                                            className="text-destructive focus:text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                                                            {t('common.delete')}
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>



                    </>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Tag className="mb-3 h-10 w-10 text-muted-foreground" />
                    <p className="text-muted-foreground">{t('finance.noCategories')}</p>
                    <Button className="mt-4" onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        {t('finance.addFirstCategory')}
                    </Button>
                </div>
            )}
        </div>
    );
};
