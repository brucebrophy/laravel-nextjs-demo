import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useQuery, gql, useMutation } from '@apollo/client'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Link from 'next/link'
import ChirpForm from '@/components/Chirp/ChirpForm'

const GET_CHIRPS = gql`
    query {
        chirps {
            data {
                id
                message
                created_at
                user {
                    id
                    name
                }
            }
        }
    }
`

const Dashboard = () => {
    const { loading, error, data } = useQuery(GET_CHIRPS)

    if (loading)
        return (
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Timeline
                    </h2>
                }>
                <Head>
                    <title>Laravel + Next</title>
                </Head>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-2">
                            <div className="p-6 bg-white border-b border-gray-200">
                                Loading...
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )

    if (error)
        return (
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Timeline
                    </h2>
                }>
                <Head>
                    <title>Laravel + Next</title>
                </Head>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-2">
                            <div className="p-6 bg-white border-b border-gray-200">
                                Error : {error.message}
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )

    const chirps = data.chirps.data

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Timeline
                </h2>
            }>
            <Head>
                <title>Laravel + Next</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ChirpForm />

                    {chirps.map(chirp => {
                        return (
                            <div
                                key={chirp.id}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-2">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    {chirp.message}
                                    <div className="mt-2 text-gray-600">
                                        Posted{' '}
                                        {formatDistanceToNow(
                                            new Date(chirp.created_at),
                                        )}{' '}
                                        by{' '}
                                        <Link
                                            href={`/users/${chirp.user.id}`}
                                            className="text-indigo-600">
                                            {chirp.user.name}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
