import React, { useMemo } from 'react';
import '../../styles/UserStats.css';

const UserStats = ({ users }) => {
  //Calculamos las estadísticas
  const stats = useMemo(() => {
    if (!users || users.length === 0) {
      return {
        total: 0,
        withAge: 0,
        withEmail: 0,
        averageAge: 0,
        ageGroups: { 
          '0-18': 0, 
          '19-30': 0, 
          '31-50': 0, 
          '51+': 0 
        }
      };
    }

    //Inicializamos las estadísticas
    const statistics = {
      total: users.length,
      withAge: 0,
      withEmail: 0,
      ageGroups: { 
        '0-18': 0, 
        '19-30': 0, 
        '31-50': 0, 
        '51+': 0 
      }
    };

    let totalAge = 0;

    users.forEach(user => {
      // Contamos usuarios con email
      if (user.email) {
        statistics.withEmail++;
      }

      //Contamos y agrupamos por edad
      if (user.age) {
        statistics.withAge++;
        totalAge += parseInt(user.age, 10);

        //Agrupar por rango de edad
        if (user.age <= 18) {
          statistics.ageGroups['0-18']++;
        } else if (user.age <= 30) {
          statistics.ageGroups['19-30']++;
        } else if (user.age <= 50) {
          statistics.ageGroups['31-50']++;
        } else {
          statistics.ageGroups['51+']++;
        }
      }
    });

    // Calculamos la edad promedio
    statistics.averageAge = statistics.withAge > 0 
      ? Math.round(totalAge / statistics.withAge * 10) / 10 
      : 0;

    return statistics;
  }, [users]);

  return (
    <div className="stats-container">
      <h2 className="stats-title">Reporte de Usuarios</h2>
      
      <div className="stats-summary">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total de Usuarios</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-value">{stats.withEmail}</span>
          <span className="stat-label">Con Email</span>
          <span className="stat-percentage">
            {stats.total > 0 ? Math.round(stats.withEmail / stats.total * 100) : 0}%
          </span>
        </div>
        
        <div className="stat-card">
          <span className="stat-value">{stats.withAge}</span>
          <span className="stat-label">Con Edad</span>
          <span className="stat-percentage">
            {stats.total > 0 ? Math.round(stats.withAge / stats.total * 100) : 0}%
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{stats.averageAge}</span>
          <span className="stat-label">Edad Promedio</span>
        </div>
      </div>

      <div className="stats-detail">
        <h3 className="stats-subtitle">Distribución por Edad</h3>
        
        {stats.withAge > 0 ? (
          <div className="age-distribution">
            {Object.entries(stats.ageGroups).map(([range, count]) => (
              <div key={range} className="age-group">
                <div className="age-label">{range}</div>
                <div className="age-bar-container">
                  <div 
                    className="age-bar" 
                    style={{ 
                      width: `${(count / stats.withAge) * 100}%`,
                      backgroundColor: range === '0-18' ? '#4BC0C0' :
                                       range === '19-30' ? '#36A2EB' :
                                       range === '31-50' ? '#9966FF' : 
                                                          '#FF9F40'
                    }}
                  ></div>
                </div>
                <div className="age-count">
                  {count} ({stats.withAge > 0 ? Math.round(count / stats.withAge * 100) : 0}%)
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No hay datos de edad disponibles</p>
        )}
      </div>
    </div>
  );
};

export default UserStats; 