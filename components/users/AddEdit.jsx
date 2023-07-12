import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
            email: Yup.string()
            .required('Email is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(user ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (user) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;
            if (user) {
                await userService.update(user.id, data);
                message = 'User updated';
            } else {
                await userService.register(data);
                message = 'User added';
            }

            // redirect to user list with success message
            router.push('/users');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3">
                <label className="block text-gray-700">First Name</label>
                <input name="firstName" type="text" {...register('firstName')} className={`border border-gray-300 rounded-md p-2 w-full ${errors.firstName ? 'border-red-500' : ''}`} />
                {errors.firstName && <div className="text-red-500">{errors.firstName.message}</div>}
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">Last Name</label>
                <input name="lastName" type="text" {...register('lastName')} className={`border border-gray-300 rounded-md p-2 w-full ${errors.lastName ? 'border-red-500' : ''}`} />
                {errors.lastName && <div className="text-red-500">{errors.lastName.message}</div>}
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mb-3">
                <label className="block text-gray-700">Email</label>
                <input name="email" type="text" {...register('email')} className={`border border-gray-300 rounded-md p-2 w-full ${errors.email ? 'border-red-500' : ''}`} />
                {errors.email && <div className="text-red-500">{errors.email.message}</div>}
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">Username</label>
                <input name="username" type="text" {...register('username')} className={`border border-gray-300 rounded-md p-2 w-full ${errors.username ? 'border-red-500' : ''}`} />
                {errors.username && <div className="text-red-500">{errors.username.message}</div>}
            </div>
            <div className="mb-3">
                <label className="block text-gray-700">
                    Password
                    {user && <em className="ms-1">(Leave blank to keep the same password)</em>}
                </label>
                <input name="password" type="password" {...register('password')} className={`border border-gray-300 rounded-md p-2 w-full ${errors.password ? 'border-red-500' : ''}`} />
                {errors.password && <div className="text-red-500">{errors.password.message}</div>}
            </div>
        </div>
        <div className="mb-3">
            <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                {formState.isSubmitting && <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900 mr-1"></span>}
                Save
            </button>
            <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
            <Link href="/users" className="btn btn-link">Cancel</Link>
        </div>
    </form>
    
    );
}