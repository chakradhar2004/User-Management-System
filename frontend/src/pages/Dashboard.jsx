import React from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Users, 
  Mail, 
  Calendar, 
  Shield, 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

export const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    {
      name: 'Profile Status',
      value: 'Active',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      name: 'Account Type',
      value: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User',
      icon: Shield,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Member Since',
      value: new Date(user?.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      name: 'Last Login',
      value: new Date(user?.lastLogin).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      icon: Clock,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  const quickActions = [
    {
      name: 'Edit Profile',
      description: 'Update your personal information',
      href: '/profile',
      icon: Users,
      color: 'bg-primary-600 text-white',
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: 'Account Created',
      description: 'Your account was successfully created',
      timestamp: user?.createdAt,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      id: 2,
      action: 'Last Login',
      description: 'You logged into your account',
      timestamp: user?.lastLogin,
      icon: Activity,
      color: 'text-blue-600',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="card hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              <p className="mt-1 text-sm text-gray-500">
                Common tasks you can perform
              </p>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quickActions.map((action) => (
                  <a
                    key={action.name}
                    href={action.href}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className={`flex-shrink-0 p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        {action.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {action.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
          </div>
          <div className="card-body">
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900 break-all">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="text-sm text-gray-900 font-mono">
                  {user?._id?.slice(0, 8)}...
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm text-green-600 font-medium">
                  {user?.isActive ? 'Active' : 'Inactive'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your recent account activity
          </p>
        </div>
        <div className="card-body">
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.color}`}
                        >
                          <activity.icon className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-900 font-medium">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
