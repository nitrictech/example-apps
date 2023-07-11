import React, { useEffect, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { callApi } from '../services/apiClient'
import { useForm } from 'react-hook-form'

export interface Form {}

const Form: React.FC<Form> = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: 'all' })

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setDisabled(false)
    }
  }, [errors])

  useEffect(() => {
    const runPrefillEvent = async () => {
      const data = {
        primary: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@test.com',
          taxId: '111111111',
          phone: '5555555555',
          address: {
            streetNumber: '123',
            street: 'Test Street',
            city: 'New York',
            state: 'NY',
            postCode: '12345',
          },
          birthDate: '2005-10-10',
        },
      }
      reset((formValues) => ({
        ...data,
      }))
    }
    runPrefillEvent()
  }, [])

  // Forms

  const [status, setStatus] = useState<'saved' | 'submitted' | undefined>(
    undefined
  )
  const [submissionId, setSubmissionId] = useState<string | undefined>(
    undefined
  )
  const [disabled, setDisabled] = useState(false)

  const onSubmit = async (values, event) => {
    event.preventDefault()
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/forms${
      event.nativeEvent.submitter.name === 'submit' ? '/submit' : '/save'
    }${submissionId ? `/${submissionId}` : ''}`

    const resp = await callApi(url, {
      method: 'POST',
      body: JSON.stringify(values),
    })
    const success = resp.status === 200 || resp.status === 201
    if (success) {
      const body = await resp.json()
      setSubmissionId(body.submissionId)
      setStatus(body.type)

      console.log(resp)
    } else {
      // handle this...
    }
  }
  return (
    <>
      {status === 'submitted' ? (
        <div className="mb-20 flex w-full flex-col gap-4 rounded-lg border border-green-100 bg-white p-20 shadow-lg">
          <h1 className="text-lg font-bold">Your entry has been submitted.</h1>
          <div>
            Your submission ID:{' '}
            <span className="text-blank font-bold">{submissionId}</span>
          </div>
          <a
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/receipts/${submissionId}`}
            className="text-blue-600 underline"
            target="_blank"
          >
            Download Receipt
          </a>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Let us know a little about you
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="primary.firstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="primary.firstName"
                          id="primary.firstName"
                          autoComplete="first-name"
                          {...register('primary.firstName', {
                            required: !disabled ? 'First name is required' : '',
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="primary.firstName"
                          as="p"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="primary.lastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="primary.lastName"
                          id="primary.lastName"
                          autoComplete="last-name"
                          {...register('primary.lastName', {
                            required: !disabled ? 'Last name is required' : '',
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="primary.lastName"
                          as="p"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="primary.email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="primary.email"
                          name="primary.email"
                          type="email"
                          autoComplete="email"
                          {...register('primary.email', {
                            required: 'Email is required',
                            validate: {
                              maxLength: (v) =>
                                v.length <= 50 ||
                                'The email should have at most 50 characters',
                              matchPattern: (v) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                  v
                                ) || 'Email address must be a valid address',
                            },
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="username@email.com"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="primary.email"
                          as="p"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="primary.birthDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date of birth
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="primary.birthDate"
                          id="primary.birthDate"
                          {...register('primary.birthDate', {})}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="primary.birthDate"
                          as="p"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="primary.taxId"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        SSN
                      </label>
                      <div className="mt-2">
                        <input
                          id="primary.taxId"
                          name="primary.taxId"
                          type="text"
                          autoComplete="taxId"
                          {...register('primary.taxId', {})}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="primary.taxId"
                          as="p"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="primary.phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="primary.phone"
                          name="primary.phone"
                          type="text"
                          autoComplete="phone"
                          {...register('primary.phone', {})}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="primary.phone"
                          as="p"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="primary.address.streetNumber"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="primary.address.streetNumber"
                          id="primary.address.streetNumber"
                          autoComplete="address-level2"
                          {...register('primary.address.streetNumber', {})}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="primary.address.street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="primary.address.street"
                          id="primary.address.street"
                          autoComplete="address-level2"
                          {...register('primary.address.street', {})}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="primary.address.city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="primary.address.city"
                          id="primary.address.city"
                          autoComplete="address-level2"
                          {...register('primary.address.city', {})}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label
                        htmlFor="primary.address.state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <select
                          id="primary.address.state"
                          name="primary.address.state"
                          autoComplete="state"
                          {...register('primary.address.state', {})}
                          className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        >
                          <option>NSW</option>
                          <option>QLD</option>
                          <option>VIC</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label
                        htmlFor="primary.address.postCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Zip
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="primary.address.postCode"
                          id="primary.address.postCode"
                          autoComplete="postal-code"
                          {...register('primary.address.postCode', {})}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                name="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Form
