import React, { useEffect } from 'react'
import { Field, FieldProps } from 'formik'
import { FormModel } from './PermissionForm'
import { Segment } from '@/components/ui'
import {
    HiOutlineCheckCircle,
    HiOutlineEye,
    HiOutlinePencil, HiOutlinePlusCircle,
    HiOutlineTrash

} from 'react-icons/hi'

interface SharedSelectorProps {
    field: FieldProps<FormModel>['field']
    form: FieldProps<FormModel>['form']
    values: FormModel
    name?: any
    initialPermissions?: any
    menu_id?: any
    onSelect?: any
}


const SharedSelector: React.FC<SharedSelectorProps> = ({
                                                           field,
                                                           form,
                                                           values,
                                                           menu_id,
                                                           initialPermissions,
                                                           onSelect,
                                                       }) => {
    useEffect(() => {
        if (initialPermissions && menu_id) {
            const permissionsForMenu = initialPermissions.find((permission: { menu_id: any }) => permission.menu_id === menu_id);
            if (permissionsForMenu) {
                const selectedPermissions = ['create', 'read', 'edit', 'delete'].filter(permissionType => permissionsForMenu[permissionType] === 1);
                form.setFieldValue(field.name, selectedPermissions);
                onSelect && onSelect(selectedPermissions);
            }
        }
    }, [initialPermissions, menu_id]);

    const handleChange = (selected: any) => {
        const newValue = Array.isArray(selected) ? selected : [selected];
        form.setFieldValue(field.name, newValue);
        onSelect && onSelect(newValue);
    };

    const renderSegmentItem = (value: string, text: string, icon: React.ReactNode) => {
        const isSelected = values[field.name]?.includes(value);
        return (
            <Segment.Item
                key={value}
                className="flex items-center justify-center text-xs"
                type="button"
                value={value}
            >
                {isSelected ? <HiOutlineCheckCircle size={15} /> : icon}
                <span className="hidden sm:block ltr:ml-2 rtl:mr-2">{text}</span>
            </Segment.Item>
        );
    };
    return (
        <Segment
            value={values[field.name]}
            selectionType="multiple"
            onChange={handleChange}
        >
            {renderSegmentItem('create', 'Create', <HiOutlinePlusCircle size={15} />)}
            {renderSegmentItem('read', 'Read', <HiOutlineEye size={15} />)}
            {renderSegmentItem('edit', 'Update', <HiOutlinePencil size={15} />)}
            {renderSegmentItem('delete', 'Delete', <HiOutlineTrash size={15} />)}
        </Segment>
    );
};



export default SharedSelector
