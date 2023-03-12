import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginThunkCreator} from "./auth-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (formik.touched.email) {
                if (!values.email) {
                    errors.email = 'Email is required'
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address'
                }
            }
            if (formik.touched.password) {
                if (!values.password) {
                    errors.password = "Password is required"
                } else if (values.password.length <= 2) {
                    errors.password = 'Password must be more than 2 symbols\n'
                }
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginThunkCreator(values.email, values.password, values.rememberMe))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   style={{backgroundColor: "#5a8b96"}}
                                   {...formik.getFieldProps('email')}
                                    // onBlur={formik.handleBlur}
                                   // name='email'
                                   // onChange={formik.handleChange}
                                   // value={formik.values.email}
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   style={{backgroundColor: '#5a8b96'}}
                                   {...formik.getFieldProps('password')}
                                   // onBlur={formik.handleBlur}
                                   // name='password'
                                   // onChange={formik.handleChange}
                                   // value={formik.values.password}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel label='Remember me'
                                          control={<Checkbox style={{color: 'white'}}
                                                             {...formik.getFieldProps('rememberMe')}
                                                             // onChange={formik.handleChange}
                                                             // name='rememberMe'
                                                             // checked={formik.values.rememberMe}
                                          />}
                                          style={{color: 'white'}}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}
                                style={{backgroundColor: '#5a8b96'}}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}