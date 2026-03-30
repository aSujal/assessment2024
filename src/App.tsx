import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import useKategorien from './hooks/useKategorien'
import useProjekte from './hooks/useProjekte'
import useGeldeinlagen from './hooks/useGeldeinlagen'
import ProjektSelectionBar from './components/ProjektSelectionBar'
import FinanzierungTab from './components/FinanzierungTab'

function App() {
  const [selectedProjektId, setSelectedProjektId] = useState<string>('')

  const { data: projekte, loading: projekteLoading } = useProjekte()
  const { data: kategorien, loading: kategorienLoading } = useKategorien()
  const { getByProjektId, save, update } = useGeldeinlagen()

  if (projekteLoading || kategorienLoading) {
    return <div className="flex justify-center items-center h-screen text-2xl text-muted-foreground">Laden...</div>
  }

  const effectiveId = selectedProjektId || (projekte.length > 0 ? projekte[0].id : '')

  return (
    <div className="min-h-screen bg-background">
      <header className="p-3 flex justify-center w-full text-lg">
        Valemus Assessment
      </header>

      <ProjektSelectionBar
        projekte={projekte}
        selectedProjektId={effectiveId}
        onSelect={setSelectedProjektId}
      />

      <main className="py-3 px-6">
        <Tabs defaultValue="finanzierung" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="cursor-pointer" value="finanzierung">
              Finanzierung
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="aufgaben">
              Aufgabenplanung
            </TabsTrigger>
          </TabsList>

          <TabsContent value="finanzierung">
            <FinanzierungTab
              projektId={effectiveId}
              kategorien={kategorien ?? []}
              geldeinlagen={getByProjektId(effectiveId)}
              onSave={save}
              onUpdate={update}
            />
          </TabsContent>

          <TabsContent value="aufgaben">
            <div className="flex flex-col gap-2 py-4">
              <h2 className="text-xl">Aufgabenplanung</h2>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur, saepe adipisci suscipit vero quae aut nobis enim,
                nulla optio delectus molestiae nesciunt odit architecto recusandae
                eos porro at voluptatum minima.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App
