import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography } from '@mui/material';
import DashboardCard from './DashboardCard';

const RecentTransactions = () => {
    return (
        <DashboardCard title="Avis reçus par l’entreprise">
            <Timeline
                className="theme-timeline"
                sx={{
                    p: 0,
                    mb: '-40px',
                    '& .MuiTimelineConnector-root': {
                        width: '1px',
                        backgroundColor: '#efefef'
                    },
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.5,
                        paddingLeft: 0,
                    },
                }}
            >
                <TimelineItem>
                    <TimelineOppositeContent>11:00</TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="primary" variant="outlined" />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography fontWeight="600">Nouvel avis ⭐⭐⭐⭐</Typography>
                        <Typography variant="body2">Client : Marie</Typography>
                        <Typography variant="body2" fontStyle="italic">
                            "Service excellent"
                        </Typography>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineOppositeContent>14:20</TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="success" variant="outlined" />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography fontWeight="600">Nouvel avis ⭐⭐⭐⭐⭐</Typography>
                        <Typography variant="body2">Client : Julien</Typography>
                        <Typography variant="body2" fontStyle="italic">
                            "Très professionnel et rapide !"
                        </Typography>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineOppositeContent>16:45</TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="warning" variant="outlined" />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography fontWeight="600">Nouvel avis ⭐⭐⭐</Typography>
                        <Typography variant="body2">Client : Sarah</Typography>
                        <Typography variant="body2" fontStyle="italic">
                            "Bon service, peut s’améliorer."
                        </Typography>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </DashboardCard>
    );
};

export default RecentTransactions;
