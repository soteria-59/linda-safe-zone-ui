
import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const ActivitySummary = () => {
  const activities = [
    {
      id: 1,
      action: 'You reported tear gas near CBD',
      time: '5 hrs ago',
      type: 'danger'
    },
    {
      id: 2,
      action: 'Shared safe route to Uhuru Park',
      time: '2 days ago',
      type: 'safety'
    },
    {
      id: 3,
      action: 'Accessed Know Your Rights guide',
      time: '1 week ago',
      type: 'info'
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'danger': return 'bg-red-100 border-red-200';
      case 'safety': return 'bg-green-100 border-green-200';
      case 'info': return 'bg-gray-100 border-gray-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const getBulletColor = (type: string) => {
    switch (type) {
      case 'danger': return 'bg-red-500';
      case 'safety': return 'bg-green-500';
      case 'info': return 'bg-black';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-3">My Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className={`p-3 rounded-lg border ${getActivityColor(activity.type)}`}>
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${getBulletColor(activity.type)}`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">{activity.action}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySummary;
