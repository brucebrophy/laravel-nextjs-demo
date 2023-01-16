import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

const CREATE_CHIRP = gql`
    mutation createChirp($message: String!, $userId: ID!) {
        createChirp(message: $message, user_id: $userId) {
            id
            message
            created_at
            user {
                id
                name
            }
        }
    }
`

const ChirpForm = () => {
    const [createChirp, { data, loading, error }] = useMutation(CREATE_CHIRP)
    const [message, setMessage] = useState('')

    const onSubmitChirp = () => {
        createChirp({ variables: { message, userId: 12 } })
        setMessage('')
    }

    if (error) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-2">
                <div className="p-6 bg-white border-b border-gray-200">
                    Error creating chirp
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-2">
                <div className="p-6 bg-white border-b border-gray-200">
                    Creating Chirp
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-2">
            <div className="p-6 bg-white border-b border-gray-200">
                <textarea
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    rows="2"
                    className="block resize-none w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                <div className="flex mt-2">
                    <button
                        className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white"
                        type="button"
                        onClick={() => onSubmitChirp()}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChirpForm
