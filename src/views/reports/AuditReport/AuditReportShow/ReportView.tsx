import Container from '@/components/shared/Container'
import ReportContent from './components/ReportContent'
import Card from '@/components/ui/Card'

const ReportView = () => {
    return (
        <Container className="h-full">
            <Card className="h-full" bodyClass="h-full">
                <ReportContent />
            </Card>
        </Container>
    )
}

export default ReportView
