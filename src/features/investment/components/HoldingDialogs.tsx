import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AddHoldingForm } from './AddHoldingForm';
import { useTranslation } from '@/hooks/useTranslation';
import type { Holding } from '@/types/investment.types';

interface HoldingDialogsProps {
    modalOpen: boolean;
    editHolding: Holding | null;
    deleteTarget: Holding | null;
    isDeleting: boolean;
    onModalClose: () => void;
    onDeleteConfirm: () => void;
    onDeleteCancel: () => void;
}

export const HoldingDialogs = ({
    modalOpen,
    editHolding,
    deleteTarget,
    isDeleting,
    onModalClose,
    onDeleteConfirm,
    onDeleteCancel,
}: HoldingDialogsProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Dialog open={modalOpen} onOpenChange={(open) => !open && onModalClose()}>
                <DialogContent className="max-w-md overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>
                            {editHolding ? t('investment.editHolding') : t('investment.addHolding')}
                        </DialogTitle>
                    </DialogHeader>
                    <AddHoldingForm
                        initialValues={editHolding ?? undefined}
                        onSuccess={onModalClose}
                        onCancel={onModalClose}
                    />
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && onDeleteCancel()}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('common.confirmDelete')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {deleteTarget
                                ? t('common.deleteConfirmWithName', {
                                      name: `${deleteTarget.symbol} — ${deleteTarget.name}`,
                                  })
                                : t('common.deleteConfirmGeneric')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onDeleteConfirm}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? t('common.deleting') : t('common.delete')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
