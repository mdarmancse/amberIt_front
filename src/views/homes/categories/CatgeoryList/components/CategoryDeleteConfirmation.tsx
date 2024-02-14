// import toast from '@/components/ui/toast'
// import Notification from '@/components/ui/Notification'
// import ConfirmDialog from '@/components/shared/ConfirmDialog'
// import {
//     setDeleteMode,
//     setSelectedRow,
//     setSelectedRows,
//     deleteDatas,
//     getDatas,
//     useAppDispatch,
//     useAppSelector,
// } from '../store'
//
// const RoleDeleteConfirmation = () => {
//     const dispatch = useAppDispatch()
//     const selectedRows = useAppSelector(
//         (state) => state.settingRoleList.data.selectedRows
//     )
//     const selectedRow = useAppSelector(
//         (state) => state.settingRoleList.data.selectedRow
//     )
//     const deleteMode = useAppSelector(
//         (state) => state.settingRoleList.data.deleteMode
//     )
//     const tableData = useAppSelector(
//         (state) => state.settingRoleList.data.tableData
//     )
//
//     const onDialogClose = () => {
//         dispatch(setDeleteMode(''))
//
//         if (deleteMode === 'single') {
//             dispatch(setSelectedRow([]))
//         }
//     }
//
//     const onDelete = async () => {
//         dispatch(setDeleteMode(''))
//
//         if (deleteMode === 'single') {
//             const success = await deleteDatas({ id: selectedRow })
//             deleteSucceed(success)
//             dispatch(setSelectedRow([]))
//         }
//
//         if (deleteMode === 'batch') {
//             const success = await deleteDatas({ id: selectedRows })
//             deleteSucceed(success, selectedRows.length)
//             dispatch(setSelectedRows([]))
//         }
//     }
//
//     const deleteSucceed = (success: boolean, orders = 0) => {
//         if (success) {
//             dispatch(getDatas(tableData))
//             toast.push(
//                 <Notification
//                     title={'Successfuly Deleted'}
//                     type="success"
//                     duration={2500}
//                 >
//                     {deleteMode === 'single' && 'Order '}
//                     {deleteMode === 'batch' && `${orders} orders `}
//                     successfuly deleted
//                 </Notification>,
//                 {
//                     placement: 'top-center',
//                 }
//             )
//         }
//     }
//
//     return (
//         <ConfirmDialog
//             isOpen={deleteMode === 'single' || deleteMode === 'batch'}
//             type="danger"
//             title="Delete product"
//             confirmButtonColor="red-600"
//             onClose={onDialogClose}
//             onRequestClose={onDialogClose}
//             onCancel={onDialogClose}
//             onConfirm={onDelete}
//         >
//             <p>
//                 Are you sure you want to delete this order? All record related
//                 to this menu will be deleted as well. This action cannot be
//                 undone.
//             </p>
//         </ConfirmDialog>
//     )
// }
//
// export default RoleDeleteConfirmation
